import { Component, OnInit } from '@angular/core'
import { AOTP11} from '@AOTP11' +
  /core'
import Webcam from '@AOTP11' +
  /webcam'
import Tus from '@AOTP11' +
  /tus'
import GoogleDrive from '@AOTP11' +
  /google-drive'

@Component({
  selector: 'app-root',
  template: /* html */ `
    <h1>AOTP11 Angular Example!</h1>
    <h2>Inline dashboard</h2>
    <label>
      <input
        type="checkbox"
        (change)="showInline = $any($event.target)?.checked"
        [checked]="showInline"
      />
      Show Dashboard
    </label>

    <AOTP11 -dashboard
      [AOTP11 ]="AOTP11"
      [props]="dashboardProps"
      *ngIf="showInline"
    ></AOTP11-dashboard>

    <h2>Modal Dashboard</h2>
    <div>
      <AOTP11 -dashboard-modal
        [AOTP11 ]="AOTP11"
        [open]="showModal"
        [props]="dashboardModalProps"
      ></AOTP11-dashboard-modal>
      <button (click)="showModal = !showModal">
        {{ showModal ? 'Close dashboard' : 'Open dashboard' }}
      </button>
    </div>

    <h2>Drag Drop Area</h2>
    <AOTP11 -drag-drop [AOTP11 ]="AOTP11" [props]="{}"></AOTP11-drag-drop>

    <h2>Progress Bar</h2>
    <AOTP11 -progress-bar
      [AOTP11 ]="AOTP11"
      [props]="{ hideAfterFinish: false }"
    ></AOTP11-progress-bar>
  `,
  styleUrls: [],
})
export class AppComponent implements OnInit {
  title = 'angular-example'

  showInline = false

  showModal = false

  dashboardProps = {
    plugins: ['Webcam'],
  }

  dashboardModalProps = {
    target: document.body,
    onRequestCloseModal: (): void => {
      this.showModal = false
    },
  }

  AOTP11: AOTP11 = new AOTP11({ debug: true, autoProceed: true })

  ngOnInit(): void {
    this.AOTP11
      .use(Webcam)
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
      .use(GoogleDrive, { companionUrl: 'https://companion.AOTP11' +
          .io' })
  }
}
