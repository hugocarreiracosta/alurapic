import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';
import { Photo } from '../../photo/photo';
import { Input } from '@angular/core';
import { UserService } from '../../../core/user/user.service';

@Directive({
    selector: '[photoOwnerOnly]',
})
export class PhotoOwnerOnlyDirective implements OnInit {
    
    @Input() ownedPhoto: Photo;
    
    constructor( private element: ElementRef<any>, private rederer: Renderer, private userService: UserService) {
        
    }
    
    ngOnInit(): void {
        this.userService
            .getUser()
            .subscribe(user => {
                if(!user || user.id != this.ownedPhoto.userId){
                    this.rederer.setElementStyle(this.element.nativeElement, 'display', 'none');
                }
            })
    }

}