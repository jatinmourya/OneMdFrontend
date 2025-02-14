import { Component, inject, ViewChild } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-list',
  imports: [
    NgFor,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  service = inject(ServiceService);
  dialog = inject(MatDialog);
  list: any = [];
  isLoading: boolean = true;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getDatas().subscribe((res: any) => {
      this.list = res;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

  @ViewChild('dialogbox') dialogboxx: any;

  deleteItem(id: any) {
    let d = this.dialog.open(this.dialogboxx);
    // console.log(d);
    d.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.service.deleteData(id).subscribe((res: any) => {
          console.log(res);
          this.loadData();
        });
      }
    });
  }
}
