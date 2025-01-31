<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'page' => 'integer|min:0',
            'size' => 'integer|min:1'
        ]);

        $doctors = Doctor::with('schedules')->paginate($validated['size'] ?? 10, ['*'], 'page', $validated['page'] ?? 0);

        return response()->json([
            'page' => $validated['page'] ?? 0,
            'size' => $validated['size'] ?? 10,
            'doctors' => $doctors
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|max:15|string',
            'name' => 'required|string',
            'gender' => 'in:M,F|required',
            'phone_number' => 'string|required',
            'address' => 'required|string',
            'email' => 'required|string',
            'bio' => 'string',
        ]);

        Doctor::create($validated);

        return response()->json([
            'message' => 'Doctor created'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Doctor $doctor)
    {
        return $doctor;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Doctor $doctor)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|max:15|string',
            'name' => 'required|string',
            'gender' => 'in:male,female|required',
            'phone_number' => 'string|required',
            'address' => 'required|string',
            'email' => 'required|string|unique:doctor,id',
            'bio' => 'nullable',
        ]);

        $doctor->update($validated);

        return response()->json([
            'message' => 'Doctor modified'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doctor $doctor)
    {
        $doctor->delete();

        return response()->json([], 204);
    }
}
