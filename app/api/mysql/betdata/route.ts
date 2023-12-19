// import the Request and Response classes
import { NextResponse, NextRequest } from "next/server";

// import mysql2/promise for mysql connectivity
import mysql from 'mysql2/promise';

// import GetDBSettings to retrieve the database connection environment parameters,
// and the IDBSettings object interface
import { GetDBSettings, IDBSettings } from '@/sharedCode/common';

// 1. populate the connection parameters
let connectionParams = GetDBSettings();


// define and export the GET handler function
export async function GET(request: NextRequest) {
    
    try {
        // 2. connect to database
        const connection = await mysql.createConnection(connectionParams);

        
        // 3. create a query to fetch data

        let startDate = request.nextUrl!.searchParams!.get('startDate');
        let endDate = request.nextUrl!.searchParams!.get('endDate');
        let get_exp_query = "";
        get_exp_query = "SELECT * FROM student.bet_data";

        // we can use this array to pass parameters to the SQL query
        let values: any[] = [];
        if (startDate && endDate) {
            get_exp_query = "SELECT * FROM student.bet_data WHERE received_date BETWEEN ? AND ? ";
            values.push(new Date(startDate as string), new Date(endDate as string))
        }
        
        // 4. exec the query and retrieve the results
        const [results] = await connection.execute(get_exp_query, values);

        // 5. close the connection when done
        connection.end();

        // return the results as a JSON API response
        return NextResponse.json(results);
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message);
        
        const response = {
            error: (err as Error).message,
            returnedStatus: 200,
        }
        
        
        return NextResponse.json(response, { status: 200 });
    }
  
}