Rails.application.routes.draw do
  scope :api do
    resources :people do
      member do
        get 'follow'
        get 'unfollow'
      end
      collection do
        get 'following'
        get 'recent'
      end
    end
    match '/login', to: "auth#login", via: [:post]
  end
end
