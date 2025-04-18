import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from '../../services/user.service';
import './display-users.component.css'; // Link the CSS file
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-display-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './display-users.component.html',
  styleUrl: './display-users.component.css'
})
export class DisplayUsersComponent implements OnInit {
  users: User[] = [];

  editIndex: number | null = null;
  editedUsername = '';
  editedPassword = '';

  constructor(private userService: UserService, private router: Router) {} // Inject Router

  ngOnInit(): void {
     // This will confirm if the method is being invoked

    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) =>{
         // Log the data

      this.users = data;
    },
      error: (err) => alert('Failed to fetch users: ' + err.message)
    });
  }

  deleteUser(index: number): void {
    const userId = this.users[index]?._id;
    if (!userId) {
      alert('User ID not found');
      return;
    }

    this.userService.deleteUser(userId).subscribe({
      next: () => this.fetchUsers(),
      error: (err) => alert('Error deleting user: ' + err.message)
    });
  }

  startEdit(index: number): void {
    this.editIndex = index;
    this.editedUsername = this.users[index]?.username || '';
    this.editedPassword = this.users[index]?.password || '';
  }

  saveEdit(): void {
    if (this.editIndex !== null) {
      const user = this.users[this.editIndex];
      const userId = user?._id;
      if (!userId) {
        alert('User ID not found');
        return;
      }

      this.userService.updateUser(userId, {
        username: this.editedUsername,
        password: this.editedPassword,
      }).subscribe({
        next: () => {
          this.fetchUsers();
          this.editIndex = null; // Reset edit mode
        },
        error: (err: { message: string }) => alert('Error updating user: ' + err.message)
      });
    }
  }

  // Cancel edit mode
  cancelEdit(): void {
    this.editIndex = null;
  }

  // Navigate to the Add User page
  goToAddUserPage(): void {
    this.router.navigate(['/add']);
  }
}
