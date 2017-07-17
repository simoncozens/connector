module TokenProvider
  class << self
    def issue_token(payload)
      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end
        
    def valid?(token)
      begin
        JWT.decode(token, Rails.application.secrets.secret_key_base)
      end
    end
  end
end