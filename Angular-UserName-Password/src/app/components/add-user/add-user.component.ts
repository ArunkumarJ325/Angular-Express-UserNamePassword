import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ Import Router
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';  // Add this import


import './add-user.component.css'; // Link the CSS file

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']  // Corrected to 'styleUrls' (plural form)
})
export class AddUserComponent {
  username = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  addUser(): void {
    if (this.username && this.password) {
      this.userService.addUser({ username: this.username, password: this.password }).subscribe({
        next: (res) => {
          
          this.router.navigate(['/display']);
        },
        error: (err) => {
          console.error('Error adding user:', err);
          alert('Error adding user: ' + err.message);
        }
      });
    } else {
      alert('Please enter username and password');
    }
  }
  
}
