class TapesController < ApplicationController
  before_action :authenticate_with_password, only: [:show]

  def create
    tape_params = params.permit(
        :name, :description, :customURL, :password, :thumbnailResourceID,
        tracks: [:name, :play_at, :start_at, :end_at, :resource_id]
    )

    tape_params[:customURL] = generate_uuid(tape_params[:name]) if tape_params[:customURL].blank?

    if Tape.exists?(uuid: tape_params[:uuid])
        render json: { error: 'Tape with this UUID already exists' }, status: :bad_request
        return
    end

    tape = Tape.new(
        name: tape_params[:name],
        description: tape_params[:description],
        uuid: tape_params[:customURL],
        password: tape_params[:password],
        resource_id: tape_params[:thumbnailResourceID]
    )

    if tape.save
      if tape_params[:tracks]
        tape_params[:tracks].each do |track_params|
          tape.tracks.create(
          name: track_params[:name],
          play_at: track_params[:play_at],
          start_at: track_params[:start_at],
          end_at: track_params[:end_at],
          resource_id: track_params[:resource_id]
        )
      end
    end
        render json: { uuid: tape.uuid }, status: :created
    else
        render json: { error: tape.errors.full_messages }, status: :unprocessable_entity
    end
  end

    def index
        tapes = Tape.includes(:resource).where(password: [nil, '']).page(params[:page]).per(20)
        formatted_tapes = tapes.map do |tape|
          {
            name: tape.name,
            uuid: tape.uuid,
            resource_url: tape.resource&.file_url # Safe navigation for potential nil resources
          }
        end

        @tapes_json = formatted_tapes.to_json
        @current_page = tapes.current_page
        @total_pages = tapes.total_pages
    
        render "pages/index"
      end

    # Method to generate a UUID using MD5 hash
    def generate_uuid(name)
        date_string = Time.now.strftime('%Y-%m-%d %H:%M:%S')
        raw_string = "#{date_string}-#{name}"
        Digest::MD5.hexdigest(raw_string)
    end

    def show
        tape = Tape.find_by(uuid: params[:uuid])
      
        if tape.nil?
          render plain: "Tape not found", status: :not_found
          return
        end
      
        @tape_json = {
          name: tape.name,
          description: tape.description,
          thumbnail_url: tape.resource&.file_url,
          tracks: tape.tracks.map do |track|
            {
              name: track.name,
              play_at: track.play_at,
              start_at: track.start_at,
              end_at: track.end_at,
              audiofile_url: track.resource&.file_url
            }
          end
        }.to_json
      
        render "pages/tape"
    end

    def authenticate_with_password
      tape = Tape.find_by(uuid: params[:uuid])
  
      if tape&.password.present?
        authenticate_or_request_with_http_basic("Tape Password Required") do |_, password|
          ActiveSupport::SecurityUtils.secure_compare(password, tape.password)
        end
      end
    end
end
  