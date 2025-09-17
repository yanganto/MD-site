{ source, stdenv, zola, uglify-js }:
  stdenv.mkDerivation rec {
    pname = "MD-site";
    version = "0.1.0";
    src = builtins.toString source;
    nativeBuildInputs = [ zola uglify-js ];
    buildPhase = ''
      cd static
      find js -type f -exec uglifyjs {} -o production/{} \;
      rm -rf js
      cd ..
      ${zola}/bin/zola build
    '';
    installPhase = "cp -r public $out";
}
