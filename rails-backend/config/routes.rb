Rails.application.routes.draw do
  root to: "people#index"
  resources :people do
    member do
      get 'follow'
      get 'unfollow'
    end
  end
  match '/login', to: "auth#login", via: [:post]
end
