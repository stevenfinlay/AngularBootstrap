import { Component, TemplateRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent
{
  public title = 'Angular-Bootstrap';
  public sidebarExpanded: boolean = true;
  private closeResult: string = '';


  /**
   *
   */
  constructor(private offcanvasService: NgbOffcanvas)
  {

  }

  /**
   *
   * @param content
   */
  public offCanvas_Open(content: TemplateRef<any>)
  {
    this.offcanvasService.open(content,
      {
        ariaLabelledBy: 'offcanvas-basic-title',
        position: 'start',
        panelClass: 'red',
        container: 'body'
      }).result
      .then((result) =>
      {
        this.closeResult = `Closed with: ${result}`;
      },
        (reason) =>
        {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
  }

  /**
   *
   * @param reason
   * @returns
   */
  private getDismissReason(reason: any): string
  {
    switch (reason)
    {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  /**
   *
   */
  public toggleSidebar(event: any): void
  {
    this.sidebarExpanded = !this.sidebarExpanded;
    console.log('sidebar state:', this.sidebarExpanded)
  }


  /**
   *
   * @returns
   */
  public getSidebarState(): string
  {
    return this.sidebarExpanded ? 'sidebarExpanded' : 'sidebarContracted';
  }

  /**
   *
   * @returns
   */
  public getContentState(): string
  {
    return this.sidebarExpanded ? 'contentContracted' : 'contentExpanded';
  }


}
