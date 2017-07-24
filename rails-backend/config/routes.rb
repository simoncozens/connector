Rails.application.routes.draw do
  root to: "people#index"
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
