<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <!-- Site footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>Contactate con nosotros</h6>
            <ul class="footer-links">
              <li>(64) - 481000</li>
              <li>Call Center 0800 - 10064 Línea gratuita desde un teléfono fijo</li>
              <li>Oficina Principal Calle Real N° 341 / 343 Huancayo - Perú</li>
              <li>Horario de atención mesa de partes - of Principal de Lun-Vie 8:45 am - 1:00 pm y de 3:30 pm a 6:00 pm Sab: 9:05 am - 12:00 pm</li>
              <li></li>
            </ul>
            <!-- <p class="text-justify">(64) - 481000 </p> -->
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Links de interes</h6>
            <ul class="footer-links">
              <li><a href="http://www.cajahuancayo.com.pe/SITECMACHYO/" target="_blank">Nueva Generación</a></li>
              <li><a href="http://www.sbs.gob.pe/usuarios" target="_blank">Portal del Usuario SBS</a></li>
              <li><a href="https://comparabien.com.pe/" target="_blank">Compara Tasas</a></li>
              <li><a href="https://www.cajahuancayo.com.pe/PCM_Security/" target="_blank">Tu Seguridad en Línea</a></li>
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <!-- <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="http://scanfcode.com/about/">About Us</a></li>
              <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
              <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
              <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
              <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
            </ul> -->
          </div>
        </div>
        <hr>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2019 Todos los Derechos Reservados 
         <a href="https://www.cajahuancayo.com.pe/">www.cajahuancayo.com.pe</a>.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="https://www.facebook.com/CajaHuancayo" target="_blank"><i class="fa fa-facebook"></i></a></li>
              <li><a class="twitter" href="https://twitter.com/cajahuancayo" target="_blank"><i class="fa fa-twitter"></i></a></li>
              <li><a class="dribbble" href="https://www.youtube.com/user/cajahuancayo?feature=mhum" target="_blank"><i class="fa fa-youtube"></i></a></li>
              <li><a class="linkedin" href="http://cajahuancayoperu.blogspot.pe/" target="_blank"><i class="fab fa-blogger"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
$color-primary-degrade: #C53030;
$color-text: #fff;

.site-footer
{
  // background: linear-gradient(to right,
  //                     rgb(237, 33, 58),
  //                     rgb(147, 41, 30));
  background: #3c4043;
  padding:45px 0 20px;
  font-size:15px;
  line-height:24px;
  color: $color-text;
}
.site-footer hr
{
  border-top-color:#bbb;
  opacity:0.5
}
.site-footer hr.small
{
  margin:20px 0
}
.site-footer h6
{
  color: $color-text;
  font-size:16px;
  text-transform:uppercase;
  margin-top:5px;
  letter-spacing:2px
}
.site-footer a
{
  color: $color-text;
}
.site-footer a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links
{
  padding-left:0;
  list-style:none
}
.footer-links li
{
  display:block
}
.footer-links a
{
  color: $color-text
}
.footer-links a:active,.footer-links a:focus,.footer-links a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links.inline li
{
  display:inline-block
}
.site-footer .social-icons
{
  text-align:right
}
.site-footer .social-icons a
{
  width:40px;
  height:40px;
  line-height:40px;
  margin-left:6px;
  margin-right:0;
  border-radius:100%;
  background-color:#33353d
}
.copyright-text
{
  margin:0
}
@media (max-width:991px)
{
  .site-footer [class^=col-]
  {
    margin-bottom:30px
  }
}
@media (max-width:767px)
{
  .site-footer
  {
    padding-bottom:0
  }
  .site-footer .copyright-text,.site-footer .social-icons
  {
    text-align:center
  }
}
.social-icons
{
  padding-left:0;
  margin-bottom:0;
  list-style:none
}
.social-icons li
{
  display:inline-block;
  margin-bottom:4px
}
.social-icons li.title
{
  margin-right:15px;
  text-transform:uppercase;
  color:#96a2b2;
  font-weight:700;
  font-size:13px
}
.social-icons a{
  background-color:#eceeef;
  color:#818a91;
  font-size:16px;
  display:inline-block;
  line-height:44px;
  width:44px;
  height:44px;
  text-align:center;
  margin-right:8px;
  border-radius:100%;
  -webkit-transition:all .2s linear;
  -o-transition:all .2s linear;
  transition:all .2s linear
}
.social-icons a:active,.social-icons a:focus,.social-icons a:hover
{
  color:#fff;
  background-color:#999
}
.social-icons.size-sm a
{
  line-height:34px;
  height:34px;
  width:34px;
  font-size:14px
}
.social-icons a.facebook:hover
{
  background-color:#3b5998
}
.social-icons a.twitter:hover
{
  background-color:#00aced
}
.social-icons a.linkedin:hover
{
  background-color:#ff8000
}
.social-icons a.dribbble:hover
{
  background-color:#ff0000
}
@media (max-width:767px)
{
  .social-icons li.title
  {
    display:block;
    margin-right:0;
    font-weight:600
  }
}
</style>