@extends('layouts.app')

@section('content')
<input id="idcurso" value="{{$idcurso}}" style="display: none"/>
<input id="idcont" value="{{$idcont}}" style="display: none"/>
<div id="verleccion"></div>
<script src="{{asset('js/app.js')}}"></script>
<script>

  /*  document.querySelectorAll( 'oembed[url]' ).forEach( element => {
        alert( element.attributes.url.value);
        iframely.load( element, element.attributes.url.value );
    } );
*/
    /*    document.querySelectorAll( 'oembed[url]' ).forEach( element => {
            // Create the <a href="..." class="embedly-card"></a> element that Embedly uses
            // to discover the media.
            const anchor = document.createElement( 'a' );
        alert( element.getAttribute( 'url' ));
        anchor.setAttribute( 'href', element.getAttribute( 'url' ) );
        anchor.className = 'embedly-card';

        element.appendChild( anchor );
    } );*/


</script>

@endsection

