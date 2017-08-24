class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session # We're authenticated anyway

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
