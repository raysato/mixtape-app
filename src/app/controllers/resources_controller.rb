class ResourcesController < ApplicationController
  def create
    # Create a new resource record
    resource = Resource.new(name: params[:name])

    # Attach the uploaded file
    resource.file.attach(params[:file])

    if resource.save
      render json: {
        id: resource.id,
        name: resource.name,
        file_url: url_for(resource.file)
      }, status: :created
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
