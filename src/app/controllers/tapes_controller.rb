class TapesController < ApplicationController

    def index
        tapes = Tape.includes(:resource).page(params[:page]).per(20)
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
end
  