import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient here
import { Observable } from 'rxjs';

// Define the User interface
export interface User {
  _id?: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';  // Your API URL

  constructor(private http: HttpClient) {}

  // Get the list of users
  getUsers(): Observable<User[]> {
    console.log('Requesting users from', this.apiUrl); 
    return this.http.get<User[]>(this.apiUrl);
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update an existing user
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Delete a user
  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
