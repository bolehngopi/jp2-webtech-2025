<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
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

        $departments = Department::paginate($validated['size'] ?? 10, ['*'], 'page', $validated['page'] ?? 0);

        return response()->json([
            'page' => $validated['page'] ?? 0,
            'size' => $validated['size'] ?? 10,
            'departments' => $departments
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'department_id' => 'required|string|max:10|unique:departments,department_id',
            'department_name' => 'required|string',
            'department_description' => 'nullable'
        ]);

        Department::create($validated);

        return response()->json([
            'message' => 'Department created'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        return response()->json([
            $department
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'department_name' => 'required|string',
            'department_description' => 'nullable'
        ]);

        $department->update($validated);

        return response()->json([
            'message' => 'Department modified'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();

        return response()->json([], 204);
    }
}
