Rails.application.routes.draw do
  devise_for :people
  root to: "people#index"
  resources :people
end
