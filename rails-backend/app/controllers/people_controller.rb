class PeopleController < ApplicationController
  before_action :set_person, only: [:show, :edit, :update, :destroy]
  before_action :authenticate!
  # GET /people
  # GET /people.json
  def index
    page = params[:page] || 1
    @people = Person.search_from_params(params).page(page)
    respond_to do |format|
      format.html
      format.json {
        render :json => {
          :current_page => @people.current_page,
          :total_entries => @people.total_count,
          :entries => @people
        }
      }
    end
  end

  # GET /people/1
  # GET /people/1.json
  def show
    followed = current_user.following?(@person)
    render :json => @person.as_json.merge({
      "followed": followed
    })
  end

  # Following

  def follow
    @person = Person.find(params[:id])
    current_user.follow!(@person)
    render :json => { :ok => 1 }
  end

  def unfollow
    @person = Person.find(params[:id])
    current_user.unfollow!(@person)
    render :json => { :ok => 1 }
  end
  def following
    @people = current_user.follows.page(params[:page]||1)
    render :json => {
      :current_page => @people.current_page,
      :total_entries => @people.total_count,
      :entries => @people.map(&:followed_user)
    }
  end

  # GET /people/new
  def new
    @person = Person.new
  end

  # GET /people/1/edit
  def edit
  end

  # POST /people
  # POST /people.json
  def create
    @person = Person.new(person_params)

    respond_to do |format|
      if @person.save
        format.html { redirect_to @person, notice: 'Person was successfully created.' }
        format.json { render :show, status: :created, location: @person }
      else
        format.html { render :new }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /people/1
  # PATCH/PUT /people/1.json
  def update
    respond_to do |format|
      if @person.update(person_params)
        format.html { redirect_to @person, notice: 'Person was successfully updated.' }
        format.json { render :show, status: :ok, location: @person }
      else
        format.html { render :edit }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /people/1
  # DELETE /people/1.json
  def destroy
    @person.destroy
    respond_to do |format|
      format.html { redirect_to people_url, notice: 'Person was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_person
      @person = Person.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def person_params
      params.fetch(:person, {})
    end
end
