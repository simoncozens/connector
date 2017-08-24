Rails.application.routes.draw do
  scope :api, defaults: {format: 'json'} do
    resources :people, :only => [:index, :show] do
      member do
        get 'follow'
        get 'unfollow'
      end
      collection do
        get 'following'
        get 'recent'
      end
    end
    put 'people', to: 'people#update'
    match 'people', to: 'people#index', via: [:options]
    match '/login', to: "auth#login", via: [:post]
  end
end
