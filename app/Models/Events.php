<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    protected $table ='events';
    protected $fillable = [
        'title','start', 'end','user_id','bridge_id'
    ];
    protected $primaryKey = 'id';
}
