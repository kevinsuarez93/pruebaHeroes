import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { HeroesService } from '../../services/heroes.service'
import { Heroe } from '../../interfaces/heroes.interface'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmComponent } from '../../components/confirm/confirm.component'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

/**
 * @author Kevin Suarez
 */
export class ListComponent implements AfterViewInit {
  heroes: Heroe[] = []
  displayedColumns: string[] = [
    'id',
    'nombre',
    'bio',
    'img',
    'aparicion',
    'accion'
  ]
  dataSource = new MatTableDataSource<Heroe>(this.heroes)

  @ViewChild(MatPaginator) paginator!: MatPaginator

  @ViewChild(MatSort, { static: true }) sort!: MatSort

  constructor(
    private _heroesService: HeroesService,
    public dialog: MatDialog
  ) {}

  /**
   * Method to initialize variables and methods
   */
  ngOnInit(): void {
    this.getHeroes()
  }

  /**
   * Method to query Heroes
   */
  getHeroes(): void {
    this._heroesService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes
      this.dataSource = new MatTableDataSource<Heroe>(heroes)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  /**
   * Method to set variables for table component and pagination
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  /**
   * Method to filter the information of the heroes
   * @param event
   */
  applyFilter(event: any): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    let filterValue = String(event.target.value)
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue
  }

  /**
   * Method to delete Hero by id
   */
  deleteHeroe(heroe: Heroe): void {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: heroe
    })

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this._heroesService.deleteHeroe(heroe.id!).subscribe(() => {
          this.getHeroes()
        })
      }
    })
  }
}
