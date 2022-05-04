Rails.application.routes.draw do
  resources :tasks
  resources :pay_roles
  resources :replies
  resources :comments
  resources :buildings
  resources :work_orders
  resources :employees
  resources :users
  resources :sessions
  get '/checklogin' => "sessions#show"
  delete '/logout' => 'sessions#destroy'
  post '/admins_login' => 'sessions#admins_login'
  post '/employees_login' => 'sessions#employees_login'
  # get '/comments' => 'comments#new'
  # post 'comments' => 'comments#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
