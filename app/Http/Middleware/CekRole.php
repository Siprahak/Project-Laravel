<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


class CekRole
{
    // /**
    //  * Handle an incoming request.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  \Closure  $next
    //  * @param  string[]  ...$roles
    //  * @return \Symfony\Component\HttpFoundation\Response
    //  */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Memastikan pengguna terautentikasi
        if ($request->user()) {
            // Memeriksa apakah role pengguna ada dalam daftar yang diizinkan
            if (in_array($request->user()->role, $roles)) {
                return $next($request); // Lanjutkan ke permintaan berikutnya
            }
        }
        return response()->json(['message' => 'Forbidden'], 403);
    }
}