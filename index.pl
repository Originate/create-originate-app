#!/usr/bin/env perl

use strict;
use warnings;
use 5.010_000;

my $repo = 'git@github.com:Originate/create-originate-app.git';
my $name = $ARGV[0];
say `git init "$name"`;
say `cd "$name" && git clone "$repo" vendor`;
say `./vendor/bootstrap`;
