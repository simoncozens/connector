class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def validate_token!
    begin
      TokenProvider.valid?(token)
    rescue
      render :json => { :error => "Not authorized" }, :status => 401
    end
  end
  
  def authenticate!
    begin
      puts(token)
      payload, header = TokenProvider.valid?(token)
      @current_user = Person.find_by(email: payload['user_email'])
      print(@current_user)
    rescue
      render :json => { :error => "Not authorized" }, :status => 401
    end
  end
  
  def current_user
    @current_user ||= authenticate!
  end
  
  def token
    request.headers['Authorization'].split(' ').last
  end
end
