{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05-small";
    flake-utils.url = "github:numtide/flake-utils";
  };

  nixConfig.extra-substituters = [
    "https://nix-community.cachix.org"
    "https://nix-cache.ant-lab.tw"
    "https://cache.garnix.io"
  ];
  nixConfig.extra-trusted-public-keys = [
    "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
    "cache.garnix.io:CTFPyKSLcx5RMJKfLo5EEPUObbA78b0YQ2DTCJXqr9g="
    "nix-cache.ant-lab.tw:zIdryBfFvXk6AyoaN8P5WWFELzDWOK7bQvIzl8nL5Y8="
  ];
  nixConfig.connect-timeout = 1;

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system: 
    let 
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShell = pkgs.mkShell ({
        buildInputs = with pkgs; [ zola ];
      });
      packages = {
        default =  pkgs.callPackage ./nix/package.nix { source = self; };
      };
    }
  );
}
