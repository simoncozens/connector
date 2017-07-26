Rails.application.routes.draw do
  namespace :api do
    resources :people do
      member do
        get 'follow'
        get 'unfollow'
      end
      collection do
        get 'following'
      end
    end
    match '/login', to: "auth#login", via: [:post]
  end
end
