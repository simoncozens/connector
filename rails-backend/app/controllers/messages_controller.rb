class MessagesController < ApplicationController
  before_action :set_message, only: [:show]
  before_action :authenticate!

  # GET /messages.json
  def index
    page = params[:page] || 1
    # Find most-recent message for each distinct person
    @messages = Message.inbox_for(current_user, page)
    render_messages
  end

  # GET /messages/with/:person.json
  def with
    page = params[:page] || 1
    other = Person.find(params[:person])
    @messages = Message.page(page).between(current_user, other)
    render_messages
  end

  # GET /messages/1.json
  def show
    render :json => @message
  end

  private
    def set_message
      @message = Message.find(params[:id])
      # XXX Check this is a message I can read
    end

    def render_messages
      render :json => {
        :current_page => @messages.current_page,
        :total_entries => @messages.total_count,
        :entries => block_given? ? @messages.map{|x| yield(x)} : @messages
      }
    end
end
