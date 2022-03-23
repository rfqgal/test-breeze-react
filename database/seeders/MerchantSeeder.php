<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MerchantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $allocation = [0, 100, 200, 300, 400, 500];
        $progress = ['Pendaftaran', 'Dalam Seleksi', 'Selesai'];
        
        for ($i=0; $i < 50; $i++) { 
            DB::table('merchants')->insert([
                'name' => Factory::create('id_ID')->name,
                'platform' => rand(0, 1) ? 'Produsen' : 'Distributor Resmi',
                'allocation' => $allocation[rand(0, 5)],
                'progress' => $progress[rand(0, 2)],
                'selection_progress' => Str::random(10)
            ]);
        }
    }
}
