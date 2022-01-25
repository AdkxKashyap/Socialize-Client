import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
  fakeInputPlholder: String;
  display = "none";
  activateBackdrop: boolean;
  constructor() {}

  ngOnInit() {
    this.activateBackdrop = false;
    this.fakeInputPlholder = "Hey,Share Your Thoughts!";
  }

  openModal() {
    this.display = "block";
    this.activateBackdrop = true;
  }
  onCloseHandled() {
    this.activateBackdrop = false;
    this.display = "none";
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event: any) => {
      console.log(event.target.result);
    });

    reader.readAsDataURL(file);
  }
}
