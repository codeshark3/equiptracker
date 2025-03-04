import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
const page = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 scroll-m-20 text-4xl font-bold tracking-tight">
        My Access Requests
      </h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-600">Pending Requests</CardTitle>
            <CardDescription>
              Awaiting approval from administrators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Approved Requests</CardTitle>
            <CardDescription>
              Successfully approved access requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Rejected Requests</CardTitle>
            <CardDescription>Access requests that were denied</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">0</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
