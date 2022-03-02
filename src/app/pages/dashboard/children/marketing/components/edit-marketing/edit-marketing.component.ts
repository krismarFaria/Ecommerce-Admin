import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-edit-marketing',
  templateUrl: './edit-marketing.component.html',
  styleUrls: ['./edit-marketing.component.scss'],
})
export class EditMarketingComponent implements OnInit {

  @Input()p;

 form: FormGroup;
  selectedFile;
  imgLoaded = false;

  constructor(private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
     private modalController: ModalController ) { }

  ngOnInit() {
  
    this.form = this.formBuilder.group({
      id: [this.p.id, [Validators.required]],
      name: [this.p.name, [Validators.required]],
      image: [this.p.image, [Validators.required]],
      description: [this.p.description, [Validators.required]]
      
     
    });
  }

  async chooseImage(event) {
    setTimeout(() => {
      this.imgLoaded = true;
    }, 2000);
    this.selectedFile = event.target.files;
    this.image.setValue(await this.firebaseService.uploadProfilePhoto(Date.now().toString(), this.selectedFile));
  }


  async editMarketing() {

    
if(this.validator()){
    const loading = await this.firebaseService.loader().create();
    await loading.present();

    this.firebaseService.updateMarketing(this.form.value).then(res => {
      this.firebaseService.toast('El producto fue actualizado con exito', 'success');
      this.modalController.dismiss();
      loading.dismiss();
    }, error => {
      this.firebaseService.toast('Ha ocurrido un error', 'danger');
      loading.dismiss();
    })
}
  

  }



  
validator(){
  if (!this.image.value){
    this.firebaseService.toast('Selecciona una imagen para el producto', 'warning')
    return false;
  }

  if (!this.form.valid){
    this.firebaseService.toast('Completa los campos correctamente', 'warning')
    return false;
  }

  return true;
}

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }


  get image() {
    return this.form.get('image');
  }




}
