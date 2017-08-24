class PeopleController < ApplicationController
  before_action :set_person, only: [:show, :edit, :destroy, :follow, :unfollow]
  before_action :authenticate!
  # GET /people
  # GET /people.json
  def index
    page = params[:page] || 1
    @people = Person.search_from_params(params).page(page)
    render_people
  end

  # GET /people/1
  # GET /people/1.json
  def show
    current_user.visit(@person)
    followed = current_user.following?(@person)
    render :json => @person.as_json.merge({
      "followed": followed
    })
  end

  # Following

  def follow
    current_user.follow!(@person)
    render :json => { :ok => 1 }
  end

  def unfollow
    current_user.unfollow!(@person)
    render :json => { :ok => 1 }
  end

  def following
    @people = current_user.follows.page(params[:page]||1)
    render_people &:followed_user
  end

  def recent
    @people = Kaminari.paginate_array(Person.find(current_user.last_visited)).page(params[:page]||1)
    render_people
  end

  def update
    puts person_params
    if current_user.update(person_params)
      render :json => { :ok => 1 }
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_person
      @person = Person.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def person_params
      params.fetch(:person, {}).permit(Person.permissible_params)
    end

    def render_people # Like they do in Fight Club
      render :json => {
        :current_page => @people.current_page,
        :total_entries => @people.total_count,
        :entries => block_given? ? @people.map{|x| yield(x)} : @people
      }
    end
end
