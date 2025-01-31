<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
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

        $schedules = Schedule::with(['doctor', 'department'])->paginate($validated['size'] ?? 10, ['*'], 'page', $validated['page'] ?? 0);

        return response()->json([
            'page' => $validated['page'] ?? 0,
            'size' => $validated['size'] ?? 10,
            'schedules' => $schedules
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|max:15|string',
            'department_id' => 'required|max:10|string',
            'date' => 'date|after:tomorrow|required',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        $schedule = Schedule::create([
            'doctor_id' => $validated['doctor_id'],
            'department_id' => $validated['department_id'],
            'schedule_date' => $validated['date'],
            'schedule_start' => $validated['start_time'],
            'schedule_end' => $validated['end_time'],
        ]);

        return response()->json([
            'message' => 'Schedule created'
        ], 200);
    }

    public function update(Request $request, Schedule $schedule)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|max:15',
            'department_id' => 'required|max:10',
            'date' => 'date|after:tomorrow|required',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        $schedule = Schedule::create([
            'doctor_id' => $validated['doctor_id'],
            'department_id' => $validated['department_id'],
            'schedule_date' => $validated['date'],
            'schedule_start' => $validated['start_time'],
            'schedule_end' => $validated['end_time'],
        ]);

        return response()->json([
            'message' => 'Schedule modified'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        return $schedule->load(['doctor', 'department']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        if ($schedule->schedule_date === now()) {
            return response()->json([
                'message' => 'Schedule cannot deleted'
            ], 404);
        }

        $schedule->delete();

        return response()->json([], 204);
    }
}
