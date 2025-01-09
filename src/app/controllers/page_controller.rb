class PageController < ApplicationController
  def index
    render "pages/index"
  end
  def new
    render "pages/new"
  end
end
