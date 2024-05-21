<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        View::composer('*', function ($view) {
            // always pass the project_id to the view
            // see https://dev.to/corbado/tutorial-add-passkeys-to-php-laravel-app-182n
            $view->with('project_id', config('corbado.project_id'));
        });
    }
}
