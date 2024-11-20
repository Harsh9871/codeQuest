import React from 'react';
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Link } from "react-router-dom";

const Loginfrom = ({ username, setUsername, password, setPassword, loading, error, onLogin }) => {

    return (
        <div>
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle>Login - Code Quest</CardTitle>
                    <CardDescription>Login to your account - Happy Coding</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onLogin}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="Username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    
                    <Button type="submit" onClick={onLogin} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                    <Link to="/signup">
                        <Button variant="ghost" className="text-blue-500 hover:text-blue-700">
                            Dont Have an account? Sign Up
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Loginfrom;
