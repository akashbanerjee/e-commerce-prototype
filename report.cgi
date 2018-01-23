#!/usr/bin/perl  

use DBI;
use CGI;
use CGI::Cookie

$q = new CGI;


#send a blank cookie.  You must insert this into the header before
#printing anything.  Also, using the CGI module makes printing
#content-type: text/html redundant.

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn006";
my $username = "jadrn006";
my $password = "cycad";
my $database_source = "dbi:mysql:$database:$host:$port";
my $cookie = $q->cookie(-name=>'jadrn006',-value=>'',-path=>'/');

print $q->header(-cookie=>$cookie);
print <<END_CONTENT;
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
    <title>Sales Report</title>
            <meta http-equiv="content-type"
                        content="text/html;charset=utf-8" />
                <meta http-equiv="Content-Style-Type" content="text/css" />


    
    <link rel="stylesheet" href="http://jadran.sdsu.edu/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/~jadrn006/proj4/css/shoppingsite.css">

    <script src="http://jadran.sdsu.edu/jquery/jquery.js"></script>
    
        
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
        
       
    <script src="http://jadran.sdsu.edu/bootstrap/js/bootstrap.min.js"></script>
    

   

</head>
<body>
END_CONTENT


my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';
my $query = "select o.sku, TRIM(p.title) as Title, SUM(o.quantity) as Sales, ROUND((SUM(o.quantity) * p.retail) - (SUM(o.quantity)*p.cost),2) as Profit from orderchocolate o inner join proj4.products p where o.sku=p.sku group by o.sku order by o.sku asc";
my $sth = $dbh->prepare($query);
$sth->execute();
my $totalprofit = 0;
my $total_sales = 0;
print "<div class=\"sales-report-head\">SALES REPORT Bertha's Deluxe Chocolates</div>";
print "<table class=\"table table-striped sales-report\">\n";
print "<thead><tr><th scope = \"col\">SKU</th><th scope = \"col\">Title</th><th scope = \"col\">Sales</th><th scope = \"col\">Profit (\$)</th></tr></thead><tbody>\n";
while(my($sku, $title, $sales, $profit) = $sth->fetchrow_array()){
    $totalprofit = $totalprofit + $profit;
    $total_sales = $total_sales + $sales;
    print "<tr><td>".$sku."</td><td>".$title."</td><td>".$sales."</td><td>".$profit."</td></tr>";
}
print "<tr><td colspan=\"2\">Gross Sales and Profit</td><td>".$total_sales."</td><td>\$".$totalprofit."</td></tr>";


print "</tbody>\n";
print "</table>\n";
print "</body>\n";
print "</html>\n";



