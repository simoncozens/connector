class AuthController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def login
    user = Person.find_by(email: params[:email])
    if user = Person.authenticate(params[:email], params[:password])
      token = ::TokenProvider.issue_token(user_email: user.email)
      render :json => user.as_json.merge({"token": token})
    else
      render :json => { :error => "Invalid credentials" }, :status => 401
    end
  end
end
