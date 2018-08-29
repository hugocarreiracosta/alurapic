import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;
    comments$: Observable<PhotoComment[]>;
    commentForm: FormGroup;

    constructor( private photoService: PhotoService, private formBuiler: FormBuilder) {
        
    }

    ngOnInit(): void {            

        
        console.log(this.photoId);    
        this.comments$ = this.photoService.getComments(this.photoId);
        
        this.commentForm = this.formBuiler.group({
            comment: ['', Validators.maxLength(300)]

        })
    }

    save(){ 
        const comment = this.commentForm.get('comment').value as string;
        this.comments$ = this.photoService
            .addComments(this.photoId, comment)
            .pipe(switchMap(() => this.photoService.getComments(this.photoId) ))
            .pipe(tap(() => {
                this.commentForm.reset();
                // alert('Comentário adicionado com sucesso!');
            }))
    }
}

