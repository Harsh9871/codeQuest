import React from 'react';
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";

const SignupForm = ({ 
    username, 
    setUsername, 
    email, 
    setEmail, 
    password, 
    setPassword, 
    confirmPassword, 
    setConfirmPassword, 
    role, 
    setRole, 
    loading, 
    error, 
    onLogin 
}) => {

    return (
        <div>
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle>Sign Up - Code Quest</CardTitle>
                    <CardDescription>Create your account - Happy Coding</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onLogin}>
                        <div className="grid w-full items-center gap-4">
                            {/* Username Field */}
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

                            {/* Email Field */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Password Field */}
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

                            {/* Confirm Password Field */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            {/* Role Dropdown */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={role}
                                    onValueChange={(value) => setRole(value)}
                                >
                                    <SelectTrigger id="role">
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">user</SelectItem>
                                        <SelectItem value="teacher">Teacher</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="submit" onClick={onLogin} disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                    <Link to="/login">
                        <Button variant="ghost" className="text-blue-500 hover:text-blue-700">
                            Already have an account? Log in
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignupForm;
