import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../services/user.service';

import { Router } from '@angular/router'; // Import Router
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-user.component.html',
})
export class ManageUserComponent implements OnInit {
  users: User[] = [];


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  
  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => alert('Failed to fetch users: ' + err.message)
    });
  }
  
  updateUser(index: number) {
    const user = this.users[index];
    const userId = user['_id'];
    this.userService.updateUser(this.users[index]._id!, {
      username: user.username,
      password: user.password,
    }).subscribe({
      next: () => alert('User updated!'),
      error: (err) => alert('Failed to update user: ' + err.message)
    });
  }
  
  deleteUser(index: number) {
    const userId = this.users[index]['_id'];
    this.userService.deleteUser(this.users[index]._id!).subscribe({
      next: () => {
        this.fetchUsers();
        alert('User deleted!');
      },
      error: (err) => alert('Failed to delete user: ' + err.message)
    });
  }
  
}
