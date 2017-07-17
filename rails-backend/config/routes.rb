Rails.application.routes.draw do
  root to: "people#index"
  resources :people
  match '/login', to: "auth#login", via: [:post]
end
