Rails.application.routes.draw do
  resources :pay_roles
  resources :replies
  resources :comments
  resources :buildings
  resources :work_orders
  resources :employees
  resources :users
  # resources :sessions
  get '/checklogin' => "sessions#show"
  delete '/logout' => 'sessions#destroy'
  post '/login' => 'sessions#login'
  # get '/comments' => 'comments#new'
  # post 'comments' => 'comments#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
