class MessagesController < ApplicationController
  before_action :set_message, only: [:show]
  before_action :authenticate!

  # GET /messages.json
  def index
    page = params[:page] || 1
    # Find most-recent message for each distinct person
    @messages = Message.inbox_for(current_user, page)
    @messages.each do |r|
      r[:message] = MessageSerializer.new(r[:message]).as_json
    end
    render_messages
  end

  # GET /messages/with/:person.json
  def with
    page = params[:page] || 1
    other = Person.find(params[:person])
    @messages = Message.between(current_user, other).page(page)
    render :json => {
      :current_page => @messages.current_page,
      :total_entries => @messages.total_count,
      :entries => block_given? ? @messages.map{|x| yield(x)} : @messages,
      :other => other
    }
  end

  # GET /messages/1.json
  def show
    render :json => @message
  end

  # POST /messages/send/:person.json
  def create
    m = Message.create(
      sender: current_user,
      recipient: Person.find(params[:person]),
      content: params[:message],
      status: "Unread"
    )
    render :json => { :ok => 1, message: m }
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
