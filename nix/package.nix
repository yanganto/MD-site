{ source, stdenv, zola }:
  stdenv.mkDerivation rec {
    pname = "MD-site";
    version = "0.1.0";
    src = builtins.toString source;
    nativeBuildInputs = [ zola ];
    buildPhase = "${zola}/bin/zola build";
    installPhase = "cp -r public $out";
}
