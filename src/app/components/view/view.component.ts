import { Component, inject, ViewChild } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-view',
  imports: [
    NgFor,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatDialogModule,
    MatProgressSpinner,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  service = inject(ServiceService);
  arouter = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(MatDialog);
  isLoading: boolean = true;

  constructor() {}
  ngOnInit() {
    let id = this.arouter.snapshot.params['id'];
    this.service.getDataById(id).subscribe((res: any) => {
      this.item = res;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      if (!res._id) {
        this.router.navigate(['/']);
      }
    });
  }
  item: any = {};
  @ViewChild('dialogbox') dialogboxx: any;
  deleteItem(id: any) {
    let d = this.dialog.open(this.dialogboxx);
    // console.log(d);
    d.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.service.deleteData(id).subscribe((res: any) => {
          console.log(res);
        });
      }
    });
  }
}
