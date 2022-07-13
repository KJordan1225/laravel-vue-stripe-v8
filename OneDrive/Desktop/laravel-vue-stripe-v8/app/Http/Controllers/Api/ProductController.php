<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // set up to return certain fields
    public function index(){
        return Product::with('categories:id,name')->get();
    }

    public function show(Product $product){
        $product->load('categories:id,name');
        return $product;
    }
}
