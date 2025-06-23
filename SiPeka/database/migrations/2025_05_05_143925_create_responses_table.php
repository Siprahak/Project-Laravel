<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('responses', function (Blueprint $table) {
            $table->id('response_id');
            $table->text('message');
            $table->foreignId('complaint_id')->unique()->constrained('complaints', 'complaint_id')->onDelete('cascade');
            $table->timestamps(); // created_at otomatis ditangani Laravel
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('responses');
    }
};
