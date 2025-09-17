{ source, stdenv, zola, uglify-js, clean-css-cli }:
  stdenv.mkDerivation rec {
    pname = "MD-site";
    version = "0.1.0";
    src = builtins.toString source;
    nativeBuildInputs = [ zola uglify-js clean-css-cli ];
    buildPhase = ''
      cd static
      find js -type f -exec uglifyjs {} -o production/{} \;
      rm -rf js
      find css -type f -exec cleancss -o production/{} {} \;
      rm -rf css
      cd ..
      ${zola}/bin/zola build
    '';
    installPhase = "cp -r public $out";
}
