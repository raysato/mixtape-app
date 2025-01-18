class TapesController < ApplicationController
    def create
        # Parse the incoming JSON
        tape_params = params.permit(
            :name, :description, :customURL, :password, :thumbnailResourceID,
            tracks: [:name, :play_at, :start_at, :end_at, :resource_id]
        )

        # Generate UUID if it's not provided or blank
        tape_params[:customURL] = generate_uuid(tape_params[:name]) if tape_params[:customURL].blank?


        # Check if a Tape with the given UUID already exists
        if Tape.exists?(uuid: tape_params[:uuid])
            render json: { error: 'Tape with this UUID already exists' }, status: :bad_request
            return
        end

        # Create the Tape
        tape = Tape.new(
            name: tape_params[:name],
            description: tape_params[:description],
            uuid: tape_params[:customURL],
            password: tape_params[:password],
            resource_id: tape_params[:thumbnailResourceID]
        )

        if tape.save
            # Create associated Tracks
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

            # Respond with the created Tape's UUID
            render json: { uuid: tape.uuid }, status: :created
        else
            render json: { error: tape.errors.full_messages }, status: :unprocessable_entity
        end
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
end
  